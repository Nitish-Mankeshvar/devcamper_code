const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

//@desc     Get all the bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  //Initial query whatever it will be...
  let query;

  //making copy req.query from 'req' express object
  const reqQuery = { ...req.query };

  //Fields to exclude if there are any
  const removeFields = ['select'];

  //loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  //create query string
  let queryStr = JSON.stringify(reqQuery);

  //create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  //finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  //Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  //Executing query
  const bootcamps = await query;
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

//@desc     Get Single bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    next(
      new ErrorResponse(`Cannot find resource with Id: ${req.params.id}`, 404)
    );
  } else {
    res.status(200).json({ success: true, data: bootcamp });
  }
});

//@desc     Create a new bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    status: true,
    data: bootcamp
  });
});

//@desc     Update all the bootcamps
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  console.log(bootcamp);
  if (!bootcamp) {
    next(
      new ErrorResponse(`Cannot find resource with Id: ${req.params.id}`, 404)
    );
  } else {
    res.status(200).json({ success: true, data: bootcamp });
  }
});

//@desc     Delete Single bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    next(
      new ErrorResponse(`Cannot find resource with Id: ${req.params.id}`, 404)
    );
  } else {
    res.status(200).json({ success: true, data: bootcamp });
  }
});

//@desc     Get Bootcamps within radius
//@route    GET /api/v1/bootcamps/radius/:zip/:distance
//@access   Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipCode, distance } = req.params;

  //Get lat/long from geocoder
  const loc = await geocoder.geocode(zipCode);
  const lat = loc[0].latitude;
  const lon = loc[0].longitude;

  //calculate radius using radians
  //divide distance by radius of earth
  //earth radius = 3, 963 MI / 6, 378 KM
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lon, lat], radius]
      }
    }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});
