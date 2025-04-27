let sayac = 0;          // her zaman 0 dan başlaması için.
let sonVeri = localStorage.getItem("sonVeri") || null;
let sontiklamazamani=0;

sonVeriyiGoster();
span.style.display =" none";    //site açıldığında veriyi yükle yazısı çıkmaması için

function guncelle(){


    document.getElementById("sayac").textContent= sayac;

    // Azalt Butonu
    if (sayac >= 1 && !document.getElementById("azalt")){
        const azalt = document.createElement("button");
        azalt.textContent = "Azalt";
        azalt.style.borderRadius="5px"
        azalt.id = "azalt";
        azalt.onclick= function (){
            sayac--;
            localStorage.setItem("sonVeri", sayac); // ARTIK her azaltmada da kaydediyoruz
            document.getElementById("sayac").textContent = sayac;
            if(sayac === 0){
                document.getElementById("azalt").remove();
            }
        };
        // Arttır butonunun sağına buton yerleştirmek için :: Not
        document.getElementById("arttir").insertAdjacentElement("afterend", azalt);
    }   
}

// Arttır fonksiyonum
function arttir(){
    sayac++;
    localStorage.setItem("sonVeri", sayac);  // ARTIK her arttırmada kaydediyoruz
    guncelle();
}
// Sıfırla Fonksiyonum
function sifirla(){
    let mevcutzaman = new Date().getTime();

    if(mevcutzaman - sontiklamazamani < 1000){
        document.getElementById("mesaj").textContent = "lütfen önce sayacı arttırın!";
        document.getElementById("mesaj").style.color = "black";
    }else {
        document.getElementById("mesaj").textContent = "";
    }
    sontiklamazamani = mevcutzaman;

// sıfırlamdan önce son veriyi kaydet
localStorage.setItem("sonVeri", sayac);

    sayac = 0;
    
    document.getElementById("sayac").textContent = " Arttırmak İçin Tıklayın";

    document.getElementById("azalt").remove();
    
    sonVeriyiGoster();

}




// Son Veriyi Gösteren ve Tıklayınca Yükleyen Fonksiyon
function sonVeriyiGoster() {
    
    let alan = document.getElementById("son-veri-alani");

    if (!alan) {
        alan = document.createElement("div");
        alan.id = "son-veri-alani";
        document.body.appendChild(alan);
    }

    alan.innerHTML = ""; // Önce temizle

    

    if (localStorage.getItem("sonVeri")) {
        const buton = document.createElement("button");
        buton.textContent = "Son veri: " + localStorage.getItem("sonVeri");
        buton.style.cursor = "pointer";
        buton.style.width = "fit-content";
        buton.style.marginRight = "10px";
        buton.style.backgroundColor = "rgb(190, 120, 120)";
        buton.style.borderRadius = "5px";
        buton.onclick = function () {
            sayac = Number(localStorage.getItem("sonVeri"));
            guncelle();
        };
        alan.appendChild(buton);
        
        const temizleBtn = document.createElement("button");
        temizleBtn.textContent = "Temizle";
        temizleBtn.style.backgroundColor = "rgb(190, 120, 120)";
        temizleBtn.style.borderRadius = "5px";
        temizleBtn.onclick = function () {
            localStorage.removeItem("sonVeri");
            sonVeriyiGoster();

            // en alttaki yazıyı temizle butonuna entegre ettik
            const  span = document.getElementById("span");
                if (span){
                    span.style.display =" none";
                 }

        };
        
        
        alan.appendChild(temizleBtn);
    }
    const br = document.createElement("br");
    alan.insertAdjacentElement("beforeend", br);

    const span = document.createElement("span");
    span.id= "span";
    span.textContent = "son veriyi yüklemek için tıklayın";
    span.style.display = "inline";          
    span.style.margin="10px";
    alan.insertAdjacentElement("beforeend",span);

}

// popup kodları
function modalGoster() {  
    // eğer modalı daha önce kapatmışsa , tekrar gösterme
    if(localStorage.getItem("modalGosterildi")){
        return;
    }
    let modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.padding = "20px";
    modal.style.backgroundColor = "white";
    modal.style.color = "black";
    modal.style.border = "1px solid black";
    modal.style.borderRadius = "10px";
    modal.style.zIndex = "1000";
    modal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

    let mesaj = document.createElement("p");
    mesaj.textContent = "Yukarı ok tuşu ile arttır, Aşağı ok tuşu ile azalt, 0 tuşu ile sıfırla";

    let kapatButton = document.createElement("button");
    kapatButton.textContent = "Kapat";
    kapatButton.style.display="block";
    kapatButton.style.marginLeft = "auto";
    kapatButton.style.marginRight = "auto";
    kapatButton.style.borderRadius = "2px";

    kapatButton.onclick = function () {
        modal.remove();
        localStorage.setItem("modalGosterildi", "true");
    };

    modal.appendChild(mesaj);
    modal.appendChild(kapatButton);
    document.body.appendChild(modal);
}

// Sayfa yüklendiğinde modal'ı göster
window.onload = function () {
    modalGoster();
};

// dinamik bilgi mesajı için de şu kod satırlarını kullanabiliriz

function dinamikBilgiMesaji() {
    let mesajDiv = document.createElement("div");
    mesajDiv.style.position = "fixed";
    mesajDiv.style.bottom = "20px";
    mesajDiv.style.left = "50%";
    mesajDiv.style.transform = "translateX(-50%)";
    mesajDiv.style.padding = "10px";
    mesajDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    mesajDiv.style.color = "white";
    mesajDiv.style.borderRadius = "5px";

    mesajDiv.textContent = "Yukarı ok tuşu ile arttır, Aşağı ok ile azalt, 0 tuşu ile sıfırla";

    document.body.appendChild(mesajDiv);

    // 5 saniye sonra mesajı gizle
    setTimeout(function () {
        mesajDiv.remove();
    }, 2000);
}

// Sayacı değiştirdikçe göster
document.addEventListener("keydown", function (e) {
    dinamikBilgiMesaji();
});

// klavye ile  etkileşim  
document.addEventListener("keydown", function (e) {
    // Yukarı ok tuşu ile arttır
    if (e.key === "ArrowUp") {
        e.preventDefault();  // Sayfanın kaymasını engelle
        arttir();            // Arttırma fonksiyonunu çağır
    }
    // Aşağı ok tuşu ile azalt (sayac > 0 olmalı)
    else if (e.key === "ArrowDown" && sayac > 0) {
        e.preventDefault();
        sayac--; 
        if(sayac === 0){
            document.getElementById("azalt").remove();
        }
        guncelle();
        
    }
    // 0 tuşu ile sıfırla
    else if (e.key === "0") {
        e.preventDefault();
        sifirla();  // Sayacı sıfırlama fonksiyonunu çağır
    }
});