// open / close behavior

const modal = document.getElementById("enquiryModal");
const closeBtn = document.querySelector(".close");

// Attach to ALL openForm buttons
document.querySelectorAll(".openForm").forEach(btn => {
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});



// submit form

document.getElementById("enquiryForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value
  };

  fetch("https://script.google.com/macros/s/AKfycbySJpWgqMuvwI5ZKmC-8DJYB_1YsGOiN4_8qR_GteY6ZMwTQUTlV1i2KgT1VPoaSXYo/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(() => {
    // hide form
    document.getElementById("enquiryForm").style.display = "none";

    // show success animation
    document.getElementById("successBox").style.display = "block";

    setTimeout(() => {
      document.getElementById("enquiryModal").style.display = "none";
      document.getElementById("enquiryForm").reset();
      document.getElementById("enquiryForm").style.display = "block";
      document.getElementById("successBox").style.display = "none";
    }, 3000);
  })
  .catch(err => {
    console.log(err);
    alert("Submission failed");
  });
});



// submit

document.getElementById("enquiryForm").addEventListener("submit", e => {
  e.preventDefault();

  document.getElementById("enquiryForm").style.display = "none";
  document.getElementById("successBox").style.display = "block";

  setTimeout(() => {
    document.getElementById("enquiryModal").style.display = "none";
    document.getElementById("enquiryForm").reset();
    document.getElementById("enquiryForm").style.display = "block";
    document.getElementById("successBox").style.display = "none";
  }, 3000);
});




// Floorpaln

const plans = {
  "2bhk": {
    title: "The Azure Suite",
    sub: "2 BHK RESIDENCE",
    area: "1,450 sq.ft.",
    view: "City Skyline",
    images: ["images/banner.png","images/banner2.png","images/2-3.jpg"]
  },
  "3bhk": {
    title: "The Emerald Grande",
    sub: "3 BHK RESIDENCE",
    area: "1,980 sq.ft.",
    view: "Garden View",
    images: ["images/3-1.jpg","images/3-2.jpg","images/3-3.jpg"]
  },
  "4bhk": {
    title: "The Royal Penthouse",
    sub: "4 BHK RESIDENCE",
    area: "2,650 sq.ft.",
    view: "Panoramic City",
    images: ["images/4-1.jpg","images/4-2.jpg","images/4-3.jpg"]
  }
};

let currentPlan = "2bhk";
let currentSlide = 0;
let slideTimer;

function buildDots() {
  const dotsBox = document.getElementById("planDots");
  dotsBox.innerHTML = "";

  plans[currentPlan].images.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");

    dot.onclick = () => {
      currentSlide = i;
      updateSlide();
      resetAuto();
    };

    dotsBox.appendChild(dot);
  });
}

function updateSlide() {
  const img = document.getElementById("planImg");
  img.src = plans[currentPlan].images[currentSlide];

  document.querySelectorAll("#planDots span").forEach((d,i)=>{
    d.classList.toggle("active", i === currentSlide);
  });
}

function resetAuto() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 4000);
}

function nextSlide() {
  const imgs = plans[currentPlan].images;
  currentSlide = (currentSlide + 1) % imgs.length;
  updateSlide();
}

buildDots();
resetAuto();

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    currentPlan = tab.dataset.type;
    currentSlide = 0;

    const data = plans[currentPlan];
    document.getElementById("planTitle").innerText = data.title;
    document.getElementById("planSub").innerText = data.sub;
    document.getElementById("planArea").innerText = data.area;
    document.getElementById("planView").innerText = data.view;

    buildDots();
    updateSlide();
    resetAuto();
  });
});

// Enquiry popup hook
document.getElementById("planEnquiry").onclick = () => {
  modal.style.display = "flex";
};






