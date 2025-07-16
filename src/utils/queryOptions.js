import db from '../models/index.js';

export const buildQueryOptions = (req, allowedIncludes = []) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort === 'desc' ? 'DESC' : 'ASC';
  const populate = req.query.populate;

  const options = {
    limit,
    offset: (page - 1) * limit,
    order: [['createdAt', sort]],
  };

  if (populate) {
    const includes = [];
    const modelsToInclude = populate.split(',');

    modelsToInclude.forEach((modelName) => {
      if (allowedIncludes.includes(modelName)) {
        if (modelName === 'Course') {
          includes.push({ model: db.Course, as: 'Courses' });
        }
      }
    });

    if (includes.length > 0) options.include = includes
  }

  return options;
};
