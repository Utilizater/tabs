function form() {
  let message = {
    loading: 'Загрузка',
    success: 'img/digital-campaign.svg',
    failure: 'img/unhappy.svg'
  };

  let form = document.querySelector(".main-form"),
    input = form.getElementsByTagName("input"),



    statusMesaage = document.getElementsByClassName("statusMesaage")[0];
    if (statusMesaage == undefined){
      statusMesaage = document.createElement("div");    
      statusMesaage.classList.add("status");
      form.appendChild(statusMesaage);
    }
    form.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(form);
    statusMesaage.style.display = "block";

    let obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    var json = JSON.stringify(obj);


    function postData(data) {
      return new Promise(function (resolve, reject) {
        let requesst = new XMLHttpRequest();
        requesst.open('POST', 'server.php');
        requesst.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


        requesst.addEventListener('readystatechange', () => {
          if (requesst.readyState < 4) {
            statusMesaage.innerHTML = message.loading;
          } else if (requesst.readyState == 4 && requesst.status == 200) {
            statusMesaage.innerHTML = "";
            statusMesaage.style.height = "80px";
            statusMesaage.style.background = `url(${message.success}) no-repeat center`;
            statusMesaage.style.marginTop = "10px";
            document.getElementById("modalPhone").value = "";
          } else {
            statusMesaage.innerHTML = "";
            statusMesaage.style.height = "80px";
            statusMesaage.style.background = `url(${message.failure}) no-repeat center`;
            statusMesaage.style.marginTop = "10px";
            document.getElementById("modalPhone").value = "";
          }
        });
        requesst.send(data);
      });
    }

    postData(formData)
      .then(() => {
        statusMesaage.innerHTML = message.loading;
      })
      .then(() => {
        statusMesaage.innerHTML = "";
        statusMesaage.style.height = "80px";
        statusMesaage.style.background = `url(${message.success}) no-repeat center`;
        statusMesaage.style.marginTop = "10px";
        document.getElementById("modalPhone").value = "";
      })
      .catch(() => {
        statusMesaage.innerHTML = "";
        statusMesaage.style.height = "80px";
        statusMesaage.style.background = `url(${message.failure}) no-repeat center`;
        statusMesaage.style.marginTop = "10px";
      })
      .then(() => {
       console.log("Hi");
        for (let i = 0; i < input.length; i++) {
          input[i].value = "";
        }
      })

  });
  //second form
  let secondForm = document.getElementById("form"),
    secondFormInputs = secondForm.getElementsByTagName("input");
  secondForm.addEventListener('submit', (event) => {
    event.preventDefault();

    secondForm.appendChild(statusMesaage);

    let formData = new FormData(secondForm);
    let obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    var json = JSON.stringify(obj);

    function postData(data) {
      return new Promise(function (resolve, reject) {
        let requesst = new XMLHttpRequest();
        requesst.open('POST', 'server.php');
        requesst.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        requesst.addEventListener('readystatechange', () => {
          if (requesst.readyState < 4) {
            statusMesaage.innerHTML = message.loading;
          } else if (requesst.readyState == 4 && requesst.status == 200) {
            resolve();
          } else {
            reject();
          }

        });
        requesst.send(data);
      });
    }

    function phonenumber(inputtxt) {
      var phoneno = /^[\+]\d{10}$/;
      if (inputtxt.match(phoneno)) {
        return true;
      } else {
        alert("message");
        return false;
      }
    }

    postData(formData)
      .then(() => {
        statusMesaage.innerHTML = message.loading;
      })
      .then(() => {
        statusMesaage.innerHTML = "";
        statusMesaage.style.height = "80px";
        statusMesaage.style.background = `url(${message.success}) no-repeat center`;
        statusMesaage.style.marginTop = "10px";
        document.getElementById("modalPhone").value = "";
      })
      .catch(() => {
        statusMesaage.innerHTML = "";
        statusMesaage.style.height = "80px";
        statusMesaage.style.background = `url(${message.failure}) no-repeat center`;
        statusMesaage.style.marginTop = "10px";
        document.getElementById("modalPhone").value = "";
      })
      .then(() => {
        for (let i = 0; i < secondFormInputs.length; i++) {
          secondFormInputs[i].value = "";
        }
      })
  });

  let phone = document.getElementsByClassName("phone");
  for (let i = 0; i < phone.length; i++) {
    phone[i].addEventListener('input', function () {
      let st = this.value;
      let st0 = st[0];
      let stMoreZero = st.substring(1, st.length);



      if (st0 != "+" || st == "") {
        this.value = "";
      }

      if (!Number.isInteger(+stMoreZero[stMoreZero.length - 1]) && stMoreZero != "") {
    
        this.value = st0 + stMoreZero.substring(0, stMoreZero.length - 1);
        return null;
      }
    });
  };

  document.getElementById("modalPhone").addEventListener('input', function () {
    let st = this.value;
    let st0 = st[0];
    let stMoreZero = st.substring(1, st.length);

    if (st0 != "+" || st == "") {
      this.value = "";
    }

    if (!Number.isInteger(+stMoreZero[stMoreZero.length - 1]) && stMoreZero != "") {
      this.value = st0 + stMoreZero.substring(0, stMoreZero.length - 1);
      return null;
    }
  });
};

module.exports = form;