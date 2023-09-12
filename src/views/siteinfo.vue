<template>
  <div class="about-section">
    <div>
      <h1 class="text-h3">关于我们</h1>
    </div>
    <br />
    <div>
      <h3 class="text-h7">
        我们的使命是通过人工智能技术和医疗专业知识，为用户提供高质量的医疗问答服务。我们希望通过这个系统，帮助用户解答医疗健康方面的疑问，提供准确的医疗建议和指导。
      </h3>
    </div>
    <q-separator></q-separator>
    <div>
      <h3 class="text-h5">联系我们</h3>
    </div>
    <div>
      <h3 class="text-h7">
        如果你对我们的医疗问答系统有任何疑问、建议或合作意向，欢迎与我们联系。你可以通过以下方式与我们取得联系：
      </h3>

      <div>电子邮件：kaadttc@gmail.com <br />电话：18800261307</div>
    </div>
  </div>
  <div class="text-container">
    <h2 style="text-align: center; color: white">Our Team</h2>
  </div>
  <div class="row">
    <div class="column">
      <div class="card">
        <img src="/1.png" alt="Kaa" style="width: 100%" />
        <div class="container">
          <h2>Jane Doe</h2>
          <p class="title">CEO & Founder</p>
          <p>Some text that describes me lorem ipsum ipsum lorem.</p>
          <p>jane@example.com</p>
        </div>
      </div>
    </div>

    <div class="column">
      <div class="card">
        <img src="/1.png" alt="Mike" style="width: 100%" />
        <div class="container">
          <h2>Mike Ross</h2>
          <p class="title">Art Director</p>
          <p>Some text that describes me lorem ipsum ipsum lorem.</p>
          <p>mike@example.com</p>
        </div>
      </div>
    </div>

    <div class="column">
      <div class="card">
        <img src="/1.png" alt="John" style="width: 100%" />
        <div class="container">
          <h2>John Doe</h2>
          <p class="title">Designer</p>
          <p>Some text that describes me lorem ipsum ipsum lorem.</p>
          <p>john@example.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.column {
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #add8e6;
  color: white;
}

.container {
  padding: 0 16px;
}

.container::after,
.row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #94af60;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #555;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}
.row {
  background: #add8e6;
}
.text-container {
  background: #add8e6;
}
</style>
