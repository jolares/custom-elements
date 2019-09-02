class ModalOpenMode extends HTMLElement {
	_modal;
	
	_isModalVisible = false;
	_modalDisplay = {
		true: 'block',
		false: 'none'
	};

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
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
			
			<!-- Modal HTML -->
			<button class="button-open">Open Modal 1</button>

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
	}

	/* Lifecycle Callbacks */

	/**
	 *  This gets invoked each time the component is appended into the DOM, and each time the node is moved.
	 *  It may also get invoked before the component's contents have been fully parsed.
	 */
	connectedCallback() {
		this._modal = this.shadowRoot.querySelector(".modal");

		this.shadowRoot.querySelector(".button-open").addEventListener('click', this._toggleModalVisible.bind(this));
		this.shadowRoot.querySelector(".button-close").addEventListener('click', this._toggleModalVisible.bind(this));
	}

	/**
	 * This is invoked each time the component is disconnected from the document's DOM.
	 */
	disconnectedCallback() {
		this.shadowRoot.querySelector(".button-open").removeEventListener('click', this._toggleModalVisible);
		this.shadowRoot.querySelector(".button-close").removeEventListener('click', this._toggleModalVisible);
	}
	/**
	 * This gets invoked each time the custom element is moved to a new document.
	 */
	adoptedCallback() { }

	/**
	 * This gets invoked each time one of the component's attributes is added, removed, or changed. 
	 * Which attributes to notice change for is specified in a static get observedAttributes method.
	 */
	attributeChangedCallback() { }

	/* Other Methods */

	_toggleModalVisible() {
		this._isModalVisible = !this._isModalVisible;
		this._modal.style.display = this._modalDisplay[this._isModalVisible];
	}
}

// Registers Modal as a Custom Element.
customElements.define('modal-open', ModalOpenMode);
