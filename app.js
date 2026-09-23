const materials=[
 {title:"Taco En el aeropuerto",level:"A1",topic:"Лексика",price:4.90,img:"airport.jpg"},
 {title:"Taco Ropa gratis",level:"A1",topic:"Лексика",price:0,img:"ropa-gratis.png",free:true,file:"ropa-gratis.png"}
];
let current="all",cart=[];
const products=document.getElementById("products"), toast=document.getElementById("toast");
function render(){
 const list=materials.filter(m=>current==="all"||m.level===current||m.topic===current);
 products.innerHTML=list.map((m,i)=>`
 <article class="product">
  <div class="product-cover"><img src="assets/${m.img}" alt="${m.title}">${m.coverTitle?`<span class="cover-title">${m.coverTitle}</span>`:""}<button class="heart" onclick="fav(this)">♡</button></div>
   <div class="product-body">
    <h3>${m.title}</h3>
    <div class="tags"><span class="tag">${m.level}</span><span class="tag topic">${m.topic}</span></div>
    <div class="product-foot"><div class="price">${m.free?"Безкоштовно":"$"+m.price.toFixed(2)}</div>${m.free?`<a class="add free-download" href="assets/${m.file}" download>Завантажити</a>`:`<button class="add" onclick="addCart('${m.title}')">Додати в кошик</button>`}</div>
   </div>
 </article>`).join("");
}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{
 document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");current=b.dataset.filter;render();
}));
function addCart(name){cart.push(name);document.getElementById("cartCount").textContent=cart.length;renderCart();showToast(`«${name}» додано до кошика`)}
function fav(btn){btn.textContent=btn.textContent==="♡"?"♥":"♡"}
function showToast(t){toast.textContent=t;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1800)}
function showFree(){
  document.getElementById("freeModal").classList.add("show");
}
function closeFree(){
  document.getElementById("freeModal").classList.remove("show");
}
function openCart(){
  document.getElementById("cartModal").classList.add("show");
}
function closeCart(){
  document.getElementById("cartModal").classList.remove("show");
}
function closeCheckout(){
  document.getElementById("checkoutModal").classList.remove("show");
}
function openCheckout(){
  document.getElementById("checkoutModal").classList.add("show");
  renderCheckout();
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

  items.innerHTML=cart.map((name,i)=>{
  const material=materials.find(m=>m.title===name);
  return `
    <div class="cart-item">
      <span>${name}</span>
      <strong>$${material.price.toFixed(2)}</strong>
      <button onclick="removeCart(${i})">×</button>
    </div>
  `;
}).join("");

  const total=cart.reduce((sum,name)=>{
    const material=materials.find(m=>m.title===name);
    return sum+(material?material.price:0);
  },0);

  document.getElementById("cartTotal").textContent=`$${total.toFixed(2)}`;
}
function renderCheckout(){
  const items=document.getElementById("checkoutItems");

  items.innerHTML=cart.map(name=>{
    const material=materials.find(m=>m.title===name);
    return `
      <div class="checkout-item">
        <span>${name}</span>
        <strong>$${material.price.toFixed(2)}</strong>
      </div>
    `;
  }).join("");

  const total=cart.reduce((sum,name)=>{
    const material=materials.find(m=>m.title===name);
    return sum+(material?material.price:0);
  },0);

  document.getElementById("checkoutTotal").textContent=`$${total.toFixed(2)}`;
}
function removeCart(i){
  cart.splice(i,1);
  document.getElementById("cartCount").textContent=cart.length;
  renderCart();
}
render();
