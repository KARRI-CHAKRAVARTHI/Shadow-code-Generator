const sliders = document.querySelectorAll(".sliders input,.color input,.inset input");
const element = document.querySelector(".element");
const code = document.querySelector(".code textarea");

sliders.forEach((slider) => slider.addEventListener("input",generateShadow));
function generateShadow(){
    const shadowParams = getShadowParams();
    const boxShadow = createBoxShadow(...shadowParams);
    applyShadow(element,boxShadow);
    updateCode(boxShadow);
}
function getShadowParams(){
    const hshadow = parseInt(document.getElementById("h-shadow").value);
    const vshadow = parseInt(document.getElementById("v-shadow").value);
    const blurRadius = parseInt(document.getElementById("blur-radius").value);
    const spreadRadius = parseInt(document.getElementById("spread-radius").value);
    const shadowColor = document.getElementById("color").value;
    const shadowColorOpacity = parseFloat(document.getElementById("opacity").value).toFixed(1);
    const shadowInset = document.getElementById("inset").checked;
    return [hshadow,vshadow,blurRadius,spreadRadius,shadowColor,shadowColorOpacity,shadowInset]
}
function createBoxShadow(hshadow,vshadow,blurradius,spreadradius,color,opacity,inset){
    const shadow = inset ? "inset" : "";
    const rgbacolor = hextorgba(color,opacity);
    return `${shadow} ${hshadow}px ${vshadow}px ${blurradius}px ${spreadradius}px ${rgbacolor}`;
}
function hextorgba(color,opacity){
    const r = parseInt(color.substr(1,2),16);
    const g = parseInt(color.substr(3,2),16);
    const b = parseInt(color.substr(5,2),16);
    return `rgba(${r},${g},${b},${opacity})`;
}
function applyShadow(element,boxShadow){
    element.style.boxShadow = boxShadow;
}
function updateCode(text){
    code.textContent = `box-Shadow: ${text}`;
}
function copyCode(){
    const codeText = code.textContent;
    navigator.clipboard.writeText(codeText)
        .then(() =>{
            alert("Code copied to clipboard");
        });
}

window.onload = generateShadow;