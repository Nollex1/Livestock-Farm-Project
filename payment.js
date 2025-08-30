// payment.js
document.addEventListener("DOMContentLoaded", () => { 
    const packageData = JSON.parse(localStorage.getItem("selectedPackage"));

    if (packageData) { 
        // Fill in package summary
        document.getElementById("packageName").textContent = packageData.tier;
        document.getElementById("packageAmount").textContent = "Amount: $" + packageData.amount;
        document.getElementById("packageBenefits").textContent = packageData.benefits;
        document.getElementById("packageTerms").textContent = packageData.terms;
    } else { 
        // If no package stored, send user back
        window.location.href = "index.html";
        return;
    }

    // Handle form submit
    document.getElementById("paymentForm").addEventListener("submit", function (e) { 
        e.preventDefault();
        alert("Payment processed successfully for " + packageData.tier + "!");
        localStorage.removeItem("selectedPackage"); // clear after payment
        window.location.href = "index.html"; // back home or dashboard
    });
});
