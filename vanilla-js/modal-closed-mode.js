class ModalClosedMode extends HTMLElement {
  _modal;

	_isModalVisible = false;
	_modalDisplay = {
		true: 'block',
		false: 'none'
  };

  constructor() {
    super();

    // This prevents us from accessing the element's shadowroot via JavaScript,
    // so we must manually store a reference to its shadowRoot to do so.
    this._modal = this.attachShadow({ mode: "closed" });
    // this.shadowRoot  // null.
  }

  connectedCallback() {
    this._modal.innerHTML = `
      <style>
        /* Modal background */
        .modal {
          display: none; 
          position: fixed; 
          left: 0;
          top: 0;
          width: 100%; 
          height: 100%; 
          padding-top: 100px; 
          z-index: 1; 
          overflow: auto; 
          background-color: rgba(0,0,0,0.4); 
        }

        /* Modal */
        .modal-content {
          margin: auto;
          width: 80%;
          padding: 0;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
          border: 1px solid #888;
          border-radius: 8px;
          background-color: #fefefe;
        }

        /* Modal close button */
        .button-close {
          float: right;
          font-size: 2rem;
          font-weight: bold;
          color: white;
        }
        .button-close:hover,
        .button-close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
        
        .modal-header {
          padding: 2px 16px;
          color: white;
          background-color: #000066;
          border-top-right-radius: 8px;
          border-top-left-radius: 8px;
        }

        .modal-body {
          padding: 1rem 1rem;
        }
      </style>

      <button class="button-open">Open Modal 2</button>

      <div class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <span class="button-close">&times</span>
            <slot name="header">
              <h1>Default header in case one is not provided</h1>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <p>Default body in case one is not provided</p>
            <slot>
          </div>
        </div>
      </div>
    `;
    
    this._modal.querySelector(".button-open").addEventListener('click', this._toggleModalVisible.bind(this));
    this._modal.querySelector(".button-close").addEventListener('click', this._toggleModalVisible.bind(this));
  }

	_toggleModalVisible() {
		this._isModalVisible = !this._isModalVisible;
		this._modal.querySelector(".modal").style.display = this._modalDisplay[this._isModalVisible];
	}
}

window.customElements.define("modal-closed-mode", ModalClosedMode);