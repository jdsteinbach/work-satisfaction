import format from "date-fns/format";

const formatQuarter = (d) => format(new Date(d), `'Q'Q`);
const formatYear = (d) => format(new Date(d), "yyyy");
const formatQuarterDescriptive = (d) => format(new Date(d), "qqqq, yyyy");
const formatFullDate = (d) => format(new Date(d), "MMM d");

export { formatQuarter, formatQuarterDescriptive, formatYear, formatFullDate };
