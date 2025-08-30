document.addEventListener("DOMContentLoaded", () => {
    // ===== Style budget table =====
    const table = document.querySelector('#budget table');
    if (table) {
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";
        table.style.fontFamily = "Arial, sans-serif";
        table.style.marginTop = "15px";

        // Headers
        table.querySelectorAll('th').forEach(th => {
            th.style.backgroundColor = "#4CAF50";
            th.style.color = "white";
            th.style.padding = "10px";
            th.style.textAlign = "left";
        });

        // Rows
        table.querySelectorAll('tr').forEach((row, index) => {
            row.style.borderBottom = "1px solid #ddd";
            row.style.backgroundColor = (index % 2 === 0) ? "#f9f9f9" : "#ffffff";
            row.addEventListener('mouseover', () => row.style.backgroundColor = "#ffeaa7");
            row.addEventListener('mouseout', () => {
                row.style.backgroundColor = (index % 2 === 0) ? "#f9f9f9" : "#ffffff";
            });
        });

        // Cells
        table.querySelectorAll('td').forEach(td => {
            td.style.padding = "8px";
        });
    }

    // ===== Updates fade-in =====
    const updates = document.querySelectorAll("#updates article");
    updates.forEach((article, index) => {
        article.style.opacity = "0";
        article.style.transform = "translateY(20px)";
        article.style.transition = "all 0.6s ease";
        setTimeout(() => {
            article.style.opacity = "1";
            article.style.transform = "translateY(0)";
        }, 300 * index);
    });
});

// ===== Investment Modal Logic =====
const investmentData = { 
  bronze: { amount: 1000, benefits: "starter package with basic returns", terms: "Funds locked for 6 months" },
  silver: { amount: 2000, benefits: "Medium package with higher ROI", terms: "Funds locked for 12 months" },
  gold: { amount: 5000, benefits: "Premium package with profit share", terms: "Funds locked for 15 months" },
  platinum: { amount:10000, benefits: "VIP package with maximum ROI, bonus and priority support", terms: "Funds locked for 24 months" }
};


// Grab all invest buttons
const investButtons = document.querySelectorAll(".invest-btn");
const modal = document.getElementById("investmentModal");
const modalPackage = document.getElementById("modalPackage");
const modalAmount = document.getElementById("modalAmount");
const modalBenefits = document.getElementById("modalBenefits");
const modalTerms = document.getElementById("modalTerms");
const confirmInvestment = document.getElementById("confirmInvestment");
const closeModal = document.getElementById("closeModal");

let selectedPackage = null;

// Open modal when button clicked
investButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedPackage = {
      name: button.getAttribute("data-tier"),
      amount: button.getAttribute("data-amount"),
      benefits: button.getAttribute("data-benefits"),
      terms: button.getAttribute("data-terms")
    };

    // Fill modal
    modalPackage.textContent = selectedPackage.name + " Tier";
    modalAmount.textContent = selectedPackage.amount;
    modalBenefits.textContent = selectedPackage.benefits;
    modalTerms.textContent = selectedPackage.terms;

    modal.style.display = "block";
  });
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Confirm investment → save to localStorage
confirmInvestment.addEventListener("click", () => {
  if (selectedPackage) {
    localStorage.setItem("selectedPackage", JSON.stringify(selectedPackage));
    window.location.href = "payment.html"; 
  }
});
//scroll to investment tiers when "Become an Investor"  button is clicked
document.querySelector("header button").addEventListener("click", function () { 
    document.getElementById("tiers").scrollIntoView({ behavior: "smooth"});
});

//click backdrop to close 
modal.addEventListener("click", (e) =>{ 
    if (e.target ===modal) modal.style.display = "none";
});

//press ESC to close 
document.addEventListener("keydown", (e) => { 
    if (e.key === "Escape") modal.style.display= "none";
});

// NAV: mobile toggle 
const navToggle = document.querySelector(' .nav__toggle');
const navlinks = document.querySelector('.nav__links');
if (navToggle) { 
  navToggle.addEventListener('click', () => { 
    const open = navlinks.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
 
//Smooth scroll for nav links (and close mobile menu after click)
document.querySelectorAll('.nav-link') .forEach(a => { 
  a.addEventListener('click', (e) => { 
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) { 
      target.scrollIntoView({ behavior: 'smooth'});
      navlinks.classList.remove('show');
      navToggle.setAttribute( ' aria-expanded', 'false');
    }

  });
});

//Highlight active link on scroll

const scetions = [ 'home' ,'about','tires','update','contact']
.map(id => document.getElementById(id))
.filter(Boolean);

const linksMap = {};
document.querySelectorAll('.nav-links').forEach(link=> { 
  linksMap[link.getAttribute(href).slice(1)] = link;

});

function setAttribute() { 
  let current =null;
  const offset = 120; //header height 
  scetions.forEach(sec => { 
    const top = sec.gotBoundingClientReact ().top - offset;
    if (top <= 0) current = sec.id;
  })};
  

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

//back to top button 
const backBtn = document.getElementById('backToTop');
function toggleBackBtn () { 
  backBtn.style.display = window.scrollY > 400 ? 'flex': 'none';
}
window.addEventListener('scroll', toggleBackBtn);
backBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth'}));

//Footer year
const y = document.getElementById('year');
if(y) y.textContent = new Date().getFullYear();
