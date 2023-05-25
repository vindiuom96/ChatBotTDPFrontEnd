import axios from "axios";

const version1_url = "http://ec2-52-55-166-140.compute-1.amazonaws.com:5000";
const version3_url = "http://ec2-3-226-5-67.compute-1.amazonaws.com:5000";
const version3_url1 = "http://ec2-127-0-0-1.compute-1.amazonaws.com:5000";
const host_url = "https://d3kpx1rcajztel.cloudfront.net";
const localhost = "http://localhost:5000";
export default axios.create({
  baseURL: localhost,
});
