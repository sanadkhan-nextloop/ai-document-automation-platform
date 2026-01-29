const jobs = {};

exports.create = (jobId, data) => {
  jobs[jobId] = data;
};

exports.get = (jobId) => {
  return jobs[jobId];
};
