var test = ""
class SpecialHeader extends HTMLElement {

    connectedCallback() {
        this.HTMLElement = $.get("header.html", function (data) {
            alert(data)
        },"text")
        alert (this.HTMLElement)
    }
}

customElements.define('special-header', SpecialHeader);