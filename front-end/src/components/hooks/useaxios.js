import React from "react";
import axios from "axios";

const axiosinstance = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 1000,
});

export default function Useaxios() {
  return axiosinstance;
}
