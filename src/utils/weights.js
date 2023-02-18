const weights = {
  Productivity: 2,
  Management: 3,
  Purpose: 4,
  "Social Connections": 3,
  Benefits: 2,
  "Company Image": 3,
  Efficiency: 3,
  Flexibility: 4,
  Travel: 4,
  "Professional Development": 1,
  Salary: 5,
  "Time Off": 4,
  Remote: 5,
};

const calculateWeightedScore = (record) => {
  const totalWeights = Object.values(weights).reduce((it, val) => it + val, 0);

  const totalWeightedValues = Object.keys(weights)
    .map((key) => {
      return record.fields[key] * weights[key];
    })
    .reduce((it, val) => it + val, 0);

  const weightedScore = totalWeightedValues / totalWeights;

  return Math.round(weightedScore * 100) / 100;
};

export { calculateWeightedScore, weights };
