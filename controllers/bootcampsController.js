const Bootcamp = require('../models/Bootcamp');

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
    res.status(400).json({ success: false, message: 'URL does not exist' });
    console.log(error);
  }
};

//@desc     Get Single bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      res.status(400).json({ success: false, message: `ID does not exist` });
      throw new Error('Id does not exist');
    } else {
      res.status(200).json({ success: true, data: bootcamp });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: `ID does not exist` });
    console.log(error);
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
    res.status(400).json({
      status: false,
      err: 'Data is duplicate or required feilds are not filled'
    });
    console.log(error);
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
      res.status(400).json({ success: false, message: `ID does not exist` });
      throw new Error('Id does not exist');
    } else {
      res.status(200).json({ success: true, data: bootcamp });
    }
  } catch (error) {
    console.log(error);
  }
};

//@desc     Delete Single bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      res.status(400).json({ success: false, message: `ID does not exist` });
      throw new Error('Id does not exist');
    } else {
      res.status(200).json({ success: true, data: bootcamp });
    }
  } catch (error) {
    console.log(error);
  }
};
