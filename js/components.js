import { hyper, Component } from 'hyperhtml';

class FormElement extends Component {
  get defaultState() {
    return {
      name: '',
      type: '',
      label: '',
      required: false,
      filled: false
    };
  }
  constructor({name, type, label, required}) {
    super();
    const filled = false;
    this.setState({name, type, label, required, filled});
  }
  oninput(e) {
    this.setState({
      filled: e.target.value.length > 0
    });
  }
  render() {
    return this.html`
      <input id="${this.state.name}" name="${this.state.name}" type="${this.state.type}" autocomplete="${this.state.name}" oninput=${this} class="${this.state.filled ? 'filled' : null }" required=${this.state.required}>
      <label for="${this.state.name}">${this.state.label}</label>
    `;
  }
}

const elements = [
  {
    el: 'form-name',
    name: 'name',
    type: 'text',
    label: 'Name',
    required: true
  },
  {
    el: 'form-email',
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true
  },
  {
    el: 'form-email-confirm',
    name: 'email_confirmation',
    type: 'email',
    label: 'Email address confirmation',
    required: true
  },
  {
    el: 'form-website',
    name: 'website',
    type: 'text',
    label: 'Website Link (Optional)',
    required: false
  }
];

class LongFormElement extends Component {
  get defaultState() {
    return {
      name: '',
      type: '',
      label: '',
      required: true,
      filled: false
    };
  }
  constructor({name, type, label, required}) {
    super();
    const filled = false;
    this.setState({name, type, label, required, filled});
  }
  oninput(e) {
    this.setState({
      filled: e.target.value.length > 0
    });
  }
  render() {
    return this.html`
      <textarea id="${this.state.name}" name="${this.state.name}" rows="3" cols="50" oninput=${this} class="${this.state.filled ? 'filled' : null }" required="${this.state.required}"></textarea>
      <label for="${this.state.name}">${this.state.label}</label>
    `;
  }
}

class AlertElement extends Component {
  get defaultState() {
    return {
      classes: 'sans-font alert hide',
      message: ''
    };
  }
  onsuccess(e) {
    this.setState({
      classes: 'sans-font alert alert-success',
      message: e.detail.message
    });
  }
  onerror(e) {
    this.setState({
      classes: 'sans-font alert alert-danger',
      message: e.detail.message
    });
  }
  render() {
    return this.html`
      <div class=${this.state.classes} onsuccess=${this} onerror=${this}>${this.state.message}</div>
    `;
  }
}

export default function () {
  return new Promise((resolve) => {
    elements.forEach((item) => {
      hyper(document.getElementById(item.el))`${new FormElement(item)}`;
    });

    hyper(document.getElementById('form-message'))`${new LongFormElement({
      name: 'message',
      type: 'textarea',
      label: 'Message',
      required: true,
    })}`;

    hyper(document.getElementById('ajax-message'))`${new AlertElement()}`;

    resolve();
  });
};
