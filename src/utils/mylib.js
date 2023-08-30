import CryptoJS from "crypto-js";

var utilFunc = {
  foo() {
    console.log("-----");
  },

  googleAnswerAdapter(method, aID, prev) {
    var myHeaders = new Headers();

    var ts = Math.floor(Date.now() / 1000);
    var raw = {
      op: method,
      ts: ts,
    };

    if (method !== "getAnswerID") {
      raw.aid = aID;
      raw.prev = prev;
    }

    var payload = JSON.stringify(raw);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: payload,
      redirect: "follow",
    };

    var k = CryptoJS.MD5(payload).toString();
    var apiUrl = "https://example.com/api"; // 替换为实际的 API URL
    return fetch(apiUrl + "?k=" + k, requestOptions)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  },
};

export default utilFunc;
