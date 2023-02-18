import format from "date-fns/format";

const formatQuarter = (d) => format(new Date(d), `'Q'Q · yyyy`);
const formatQuarterDescriptive = (d) => format(new Date(d), `qqqq, yyyy`);

export { formatQuarter, formatQuarterDescriptive };
