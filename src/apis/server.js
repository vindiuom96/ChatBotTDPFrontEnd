import axios  from "axios";

const version1_url = "http://ec2-52-55-166-140.compute-1.amazonaws.com:5000"
const version3_url = "http://ec2-3-237-252-85.compute-1.amazonaws.com:5000"
const localhost = "http://localhost:5000"
export default axios.create({
    baseURL: version3_url,
  });
