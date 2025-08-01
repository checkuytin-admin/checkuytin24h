async function fetchData() {
  const response = await fetch('data.json');
  return await response.json();
}

async function loadTable() {
  const data = await fetchData();
  const table = document.getElementById('gdvTable');
  data.forEach(gdv => {
    const row = `<tr>
      <td>${gdv.name} ${gdv.verified ? "✔" : ""}</td>
      <td>${gdv.zalo}</td>
      <td><a href="${gdv.facebook}" target="_blank">Facebook</a></td>
      <td>${gdv.deposit.toLocaleString()} VNĐ</td>
    </tr>`;
    table.innerHTML += row;
  });
}

async function searchGDV() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const data = await fetchData();
  const result = document.getElementById('result');
  const found = data.find(gdv => gdv.name.toLowerCase().includes(input) || gdv.facebook.toLowerCase().includes(input));

  if(found) {
    result.innerHTML = `<p style="color:green;">✔ ${found.name} đã cọc ${found.deposit.toLocaleString()} VNĐ</p>`;
  } else {
    result.innerHTML = `<p style="color:red;">⚠ Không tìm thấy! Hãy cẩn thận trước khi giao dịch.</p>`;
  }
}

loadTable();