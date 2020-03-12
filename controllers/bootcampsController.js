const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
//@desc     Get all the bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//@desc     Get Single bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      next(
        new ErrorResponse(`Cannot find resource with Id: ${req.params.id}`, 404)
      );
    } else {
      res.status(200).json({ success: true, data: bootcamp });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//@desc     Create a new bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      status: true,
      data: bootcamp
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//@desc     Update all the bootcamps
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamp = async (req, res, next) => {
  try {
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
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//@desc     Delete Single bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      next(
        new ErrorResponse(`Cannot find resource with Id: ${req.params.id}`, 404)
      );
    } else {
      res.status(200).json({ success: true, data: bootcamp });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
