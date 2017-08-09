
class MazeRunner extends HTMLElement {

    static get observedAttributes() {
        return [
            'data-name',
            'data-img',
            'data-url'
        ];
    }

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const img = document.createElement('img');
        img.alt = this.getAttribute('data-name');
        img.src = this.getAttribute('data-img');
        img.width = 150;
        img.height = 150;
        img.className = 'product-img';

        shadow.appendChild(img);

        img.addEventListener('click', () => {
            window.location = this.getAttribute('data-url');
        });

        const link = document.createElement('a');
        link.innerText = this.getAttribute('data-name');
        link.href = this.getAttribute('data-url');
        link.className = 'product-name';

        shadow.appendChild(link);
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if (attr === 'data-name') {
            this.shadowRoot.querySelector('a').innerText = newValue;
            this.shadowRoot.querySelector('img').alt = newValue;
        } else if (attr === 'data-img') {
            this.shadowRoot.querySelector('img').src = newValue;
        } else if (attr === 'data-url') {
            this.shadowRoot.querySelector('a').href = newValue;
        }
    }
}

customElements.define('maze-runner', MazeRunner);
