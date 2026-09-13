const materials=[
 {title:"En el aeropuerto",level:"A1",topic:"Лексика",price:4.90,img:"airport.jpg"},
 {title:"Ser vs. Estar – Pack completo",level:"A1",topic:"Граматика",price:5.90,img:"ser-estar.jpg"},
 {title:"En el restaurante",level:"A1",topic:"Лексика",price:4.90,img:"restaurant.jpg"},
 {title:"Frases útiles para viajar",level:"A1",topic:"Говоріння",price:3.90,img:"travel.jpg"},
 {title:"Rutina diaria",level:"A1",topic:"Лексика",price:4.50,img:"routine.jpg"},
 {title:"Pretérito perfecto",level:"A2",topic:"Граматика",price:5.90,img:"ser-estar.jpg"},
 {title:"Historias en pasado",level:"A2",topic:"Говоріння",price:4.90,img:"routine.jpg"},
 {title:"Viajar por España",level:"B1",topic:"Подорожі",price:6.90,img:"travel.jpg"}
];
let current="all",cart=[];
const products=document.getElementById("products"), toast=document.getElementById("toast");
function render(){
 const list=materials.filter(m=>current==="all"||m.level===current||m.topic===current);
 products.innerHTML=`<article class="product">
      <div class="product-cover"><div style="width:100%;height:100%;display:grid;place-items:center;background:linear-gradient(135deg,#d9c6ff,#c8f5de);font-size:58px">🍎</div><button class="heart" onclick="fav(this)">♡</button></div>
      <div class="product-body"><h3>Los alimentos</h3><div class="tags"><span class="tag">A1</span><span class="tag topic">Лексика</span></div>
      <div class="product-foot"><div class="price">FREE</div><button class="add" onclick="window.location.href='assets/los_alimentos_a1_free.pdf'">Завантажити</button></div></div></article>`+
      list.map((m,i)=>`
 <article class="product">
   <div class="product-cover"><img src="assets/${m.img}" alt="${m.title}"><button class="heart" onclick="fav(this)">♡</button></div>
   <div class="product-body">
    <h3>${m.title}</h3>
    <div class="tags"><span class="tag">${m.level}</span><span class="tag topic">${m.topic}</span></div>
    <div class="product-foot"><div class="price">$${m.price.toFixed(2)}</div><button class="add" onclick="addCart('${m.title}')">Додати в кошик</button></div>
   </div>
 </article>`).join("");
}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{
 document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");current=b.dataset.filter;render();
}));
function addCart(name){cart.push(name);document.getElementById("cartCount").textContent=cart.length;renderCart();showToast(`«${name}» додано до кошика`)}
function fav(btn){btn.textContent=btn.textContent==="♡"?"♥":"♡"}
function showToast(t){toast.textContent=t;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1800)}
function showFree(){showToast("Тут будуть твої перші безкоштовні матеріали 💜")}
function openCart(){
  document.getElementById("cartModal").classList.add("show");
}
function closeCart(){
  document.getElementById("cartModal").classList.remove("show");
}
function renderCart(){
  const items=document.getElementById("cartItems");
  const empty=document.getElementById("cartEmpty");

  if(cart.length===0){
    items.innerHTML="";
    empty.style.display="block";
    document.getElementById("cartTotal").textContent="$0.00";
    return;
  }

  empty.style.display="none";

  items.innerHTML=cart.map((name,i)=>`
    <div class="cart-item">
      <span>${name}</span>
      <button onclick="removeCart(${i})">×</button>
    </div>
  `).join("");

  const total=cart.reduce((sum,name)=>{
    const material=materials.find(m=>m.title===name);
    return sum+(material?material.price:0);
  },0);

  document.getElementById("cartTotal").textContent=`$${total.toFixed(2)}`;
}
function removeCart(i){
  cart.splice(i,1);
  document.getElementById("cartCount").textContent=cart.length;
  renderCart();
}
render();
