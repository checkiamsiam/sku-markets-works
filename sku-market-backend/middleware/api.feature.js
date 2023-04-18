const apiFeature = (req, res, next) => {
  // set limit and skip to the request
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  // sort by
  let sort = req.query.sort || "createdAt";
  sort = sort.split(",").join(" ");

  // create sort object
  const sortObj = {};
  sort.split(" ").forEach((el) => {
    if (el.startsWith("-")) {
      sortObj[el.slice(1)] = -1;
    } else {
      sortObj[el] = 1;
    }
  });

  const query = req.query;
  const newQuery = { ...query };

  const excludedFields = ["page", "sort", "limit", "fields"];

  excludedFields.forEach((el) => delete newQuery[el]);

  // replace gte|gt|lte|lt with $gte|$gt|$lte|$lt
  let queryStr = JSON.stringify(newQuery);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // convert queryStr valid javascript object
  const queryObj = JSON.parse(queryStr);
  // remove quotes from  numbers and booleans
  Object.keys(queryObj).forEach((key) => {
    if (queryObj[key] === "true") {
      queryObj[key] = true;
    } else if (queryObj[key] === "false") {
      queryObj[key] = false;
    } else if (!isNaN(queryObj[key])) {
      queryObj[key] = parseInt(queryObj[key]);
    }

    // if key is { '$gt': '10' } then convert it to { '$gt': 10 }
    if (typeof queryObj[key] === "object") {
      Object.keys(queryObj[key]).forEach((el) => {
        if (!isNaN(queryObj[key][el])) {
          queryObj[key][el] = parseInt(queryObj[key][el]);
        }
      });
    }
  });

  // select fields
  let fields = req.query.fields || "sku";
  fields = fields.split(",").join(" ");

  // create fields object
  const fieldsObj = {};
  fields.split(" ").forEach((el) => {
    fieldsObj[el] = 1;
  });

  const pipeline = [
    // sort by
    {
      $sort: sortObj,
    },
    //use queryStr to filter the data
    {
      $match: queryObj,
    },
    // select fields
    {
      $project: fieldsObj,
    },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        total: [{ $count: "total" }],
      },
    },
  ];

  // set pipeline to the request
  req.pipeline = pipeline;

  next();
};

module.exports = apiFeature;
