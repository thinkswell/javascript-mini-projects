let index = 0;


function displayCustomer(newIndex){

  if(newIndex<0){
    index = userObject.length -1;
  }
  else if (newIndex>=userObject.length){
    index=0;
  }
  else{
    index = newIndex;
  }



  const customerImage = document.getElementById('customer-image');
  const customerName = document.getElementById('customer-name');
  const customerReview = document.getElementById('customer-review');

  const customer = userObject[index];
  customerImage.src = customer.image;
  customerName.textContent = customer.name;
  customerReview.textContent = customer.customerReview;


  return customer;

}

function preButton(){
  index--;
  displayCustomer(index);
  };


function nextButton(){
   index++;
   displayCustomer(index); 
  }

function randomButton(){
  randomIndex = Math.floor(Math.random()*userObject.length);
  displayCustomer(randomIndex);
  };




document.getElementById("prev").addEventListener("click",preButton);
document.getElementById("next").addEventListener("click",nextButton);
document.getElementById("random").addEventListener("click",randomButton);


displayCustomer(index);


//review


const modal = document.getElementById("review-form");
const openFormBtn = document.getElementById("open-form");
const closeFormBtn = document.getElementById("close-form");
const form = document.getElementById("new-review-form");


openFormBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});


closeFormBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside the content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


form.addEventListener("submit", (e) => {
  e.preventDefault(); 

  const name = document.getElementById("name").value;
  const image = document.getElementById("image").value;
  const review = document.getElementById("review").value;

  
  userObject.push({
    name: name,
    image: image,
    customerReview: review,
  });

  alert("Review submitted successfully!");
  modal.style.display = "none";
  form.reset(); // Reset form fields
});

function setupSidebar() {
  const sidebar = document.querySelector('.sidebar');
  userObject.forEach((customer, index) => {
      const div = document.createElement('div');
      div.textContent = customer.name;
      div.onclick = () => {
          displayCustomer(index);
      };
      sidebar.appendChild(div);
  });
}

setupSidebar();











