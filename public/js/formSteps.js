let currentTab = 0
showTab(currentTab)

function showTab(n) {
  let x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  fixStepIndicator(n)
}

function nextPrev(n) {
  let x = document.getElementsByClassName("tab");
    const video = document.getElementById('video')

    x[currentTab].style.display = 'none'
    currentTab = currentTab + n;

/*     if (n == 1){
        video.style.display = 'none'
    } */

  if (currentTab >= x.length) {
    document.getElementById("regForm").submit();
    return false;
  }
  showTab(currentTab);
}

function fixStepIndicator(n) {
  let i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}
