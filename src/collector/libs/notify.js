$.notify = function (text, type, title, options) {
  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  let defaultOptions = {
    text: "",
    title: "",
    type: "general",
    closeable: false,
    duration: 5000,
    dismiss: true,
  };

  defaultOptions.title = title;
  defaultOptions.type = type;
  defaultOptions.text = text;

  let types = {
    success: {
      alert: "success",
      button: "green",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>`
    },
    warning: {
      alert: "warning",
      button: "yellow",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            `,
    },
    error: {
      alert: "error",
      button: "red",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            `
    },
    general: {
      alert: "",
      button: "default",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
            `
    },
  };
  const alertContainer = '[data-component="alerts"]';

  $.extend(defaultOptions, options);
  if (!Object.keys(types).includes(defaultOptions.type)) {
    defaultOptions.type = "general";
  }

  let alertId = uuidv4();

  let template = `<div data-alert="${alertId}" class="alert-notify animate animate__backInRight ${
    types[defaultOptions.type].alert
  }">
                    <div class="notify-container">
                        <div class="icon">
                            <span>
                                ${types[defaultOptions.type].icon}
                            </span>
                        </div>
                        <div class="content">
                            <div class="header">
                                ${
                                  defaultOptions.title &&
                                  defaultOptions.title.length > 0
                                    ? `<span class="title">${defaultOptions.title}</span>`
                                    : ""
                                }
                                ${
                                  defaultOptions.closeable
                                    ? `<span>
                                <button class="btn btn-${
                                  types[defaultOptions.type].button
                                } btn-icon rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </span>`
                                    : ""
                                }
                            </div>
                            <div class="text">${defaultOptions.text}</div>
                        </div>
                    </div>
                    </div>`;

  $(alertContainer).prepend(template);
  $(alertContainer).removeClass("is-hidden");

  if (defaultOptions.dismiss) {
    let duration = defaultOptions.duration;
    let alertInterval = setInterval(function () {
      duration = duration - 1000;
      if (duration <= 0) {
        $('[data-alert="' + alertId + '"]').remove();
        if ($(alertContainer).length == 0) {
          $(alertContainer).addClass("is-hidden");
        }
        clearInterval(alertInterval);
      } else if (duration <= 1000) {
        $('[data-alert="' + alertId + '"]').addClass("animate__backOutRight");
      }
    }, 1000);

    $('[data-alert="' + alertId + '"]').on("mouseover", function () {
      clearInterval(alertInterval);
    });

    $('[data-alert="' + alertId + '"]').on("mouseleave", function () {
      let alertInterval = setInterval(function () {
        duration = duration - 1000;
        if (duration <= 0) {
          $('[data-alert="' + alertId + '"]').remove();
          if ($(alertContainer).length == 0) {
            $(alertContainer).addClass("is-hidden");
          }
          clearInterval(alertInterval);
        } else if (duration <= 1000) {
          $('[data-alert="' + alertId + '"]').addClass("animate__backOutRight");
        }
      }, 1000);
    });
  }
};
