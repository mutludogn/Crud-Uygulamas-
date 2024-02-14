// localstorage tablosu
const localStorageKey = "users_list_4";

// eğer içi dolu ise karışma yoksa boş obje olsun
let users = JSON.parse(localStorage.getItem(localStorageKey)) || [];

console.log(users);

// kullanıcı ekle
function addUser() {
  // html kodu içinden elementleri aldık
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  if (name == "") {
    alert("Username boş olamaz :/");
  } else if (email == "") {
    alert("E-Posta Adresi boş olamaz :/");
  } else {
    const mevcutUser = users.find((user) => user.email === email);
    if (mevcutUser) {
      mevcutUser.name = name;
    } else {
      // mevcutta kullanıcı yoksa ekle
      users.push({ name, email });
    }

    // kullanıcıdan alınan verileri locale kaydet
    localStorage.setItem(localStorageKey, JSON.stringify(users));
  }

  // eklenen kullanıcıları ekrana yazdır
  console.log(localStorage.getItem(localStorageKey));
}

// kullanıcıları listele
function displayUsers() {
  // listelenecek divi tanımladık
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  users.forEach((user) => {
    // itemler için li objesi oluştur
    const listItem = document.createElement("li");
    listItem.innerHTML = `
          Kullanıcı Adı : ${user.name} 
          </br>
          E-Posta Adresi : ${user.email}
          </br>
          <button onclick="editUser('${user.email}')">Düzenle</button>
          <button onclick="deleteUser('${user.email}')">Sil</button>
          </br>
          </br>
          
          <div>------------------------------</div>
      `;
    userList.appendChild(listItem);
  });
}

displayUsers();

// kullanıcı düzenleme fonksiyonu
function editUser(email) {
  // daha önceden kayıtlı bir email var mı kontrolu
  const userToEdit = users.find((user) => user.email === email);

  if (userToEdit) {
    document.getElementById("username").value = userToEdit.name;
    document.getElementById("email").value = userToEdit.email;


  }
}

// kullanıcı silme fonksiyonu
function deleteUser(email){
  users = users.filter(user => user.email !== email)
  localStorage.setItem(localStorageKey, JSON.stringify(users))
  displayUsers()
}

function temizle() {
  // localstorage'i temizle
  localStorage.clear();
}