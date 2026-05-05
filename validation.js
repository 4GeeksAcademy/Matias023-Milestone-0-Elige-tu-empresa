document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("leadForm");
	if (!form) {
		return;
	}

	const fields = {
		companyName: document.getElementById("companyName"),
		contactPerson: document.getElementById("contactPerson"),
		corporateEmail: document.getElementById("corporateEmail"),
		phone: document.getElementById("phone"),
		companyWebsite: document.getElementById("companyWebsite"),
		operationCountry: document.getElementById("operationCountry"),
		productType: document.getElementById("productType"),
		monthlyVolume: document.getElementById("monthlyVolume"),
		comments: document.getElementById("comments"),
		privacyPolicy: document.getElementById("privacyPolicy"),
	};

	const services = Array.from(form.querySelectorAll('input[name="services"]'));
	const current3plOptions = Array.from(form.querySelectorAll('input[name="current3pl"]'));

	const errorElements = {
		companyName: document.getElementById("companyNameError"),
		contactPerson: document.getElementById("contactPersonError"),
		corporateEmail: document.getElementById("corporateEmailError"),
		phone: document.getElementById("phoneError"),
		companyWebsite: document.getElementById("companyWebsiteError"),
		operationCountry: document.getElementById("operationCountryError"),
		productType: document.getElementById("productTypeError"),
		monthlyVolume: document.getElementById("monthlyVolumeError"),
		services: document.getElementById("servicesError"),
		current3pl: document.getElementById("current3plError"),
		comments: document.getElementById("commentsError"),
		privacyPolicy: document.getElementById("privacyPolicyError"),
	};

	const commentsCounter = document.getElementById("commentsCounter");
	const volumeWarning = document.getElementById("volumeWarning");
	const successMessage = document.getElementById("successMessage");

	const INVALID_BORDER_CLASS = "border-red-500";
	const INVALID_RING_CLASS = "focus:ring-red-500";

	function showFieldError(element, errorElement, message) {
		if (!element || !errorElement) {
			return;
		}
		errorElement.textContent = message;
		element.classList.add(INVALID_BORDER_CLASS, INVALID_RING_CLASS);
	}

	function clearFieldError(element, errorElement) {
		if (!element || !errorElement) {
			return;
		}
		errorElement.textContent = "";
		element.classList.remove(INVALID_BORDER_CLASS, INVALID_RING_CLASS);
	}

	function showGroupError(errorElement, message) {
		if (!errorElement) {
			return;
		}
		errorElement.textContent = message;
	}

	function clearGroupError(errorElement) {
		if (!errorElement) {
			return;
		}
		errorElement.textContent = "";
	}

	function updateCommentsCounter() {
		if (!fields.comments || !commentsCounter) {
			return;
		}
		const available = 500 - fields.comments.value.length;
		commentsCounter.textContent = `${available} caracteres disponibles`;
	}

	function validateCompanyName() {
		const value = fields.companyName.value.trim();
		if (value.length < 2) {
			showFieldError(
				fields.companyName,
				errorElements.companyName,
				"El nombre de la empresa debe tener al menos 2 caracteres"
			);
			return false;
		}
		clearFieldError(fields.companyName, errorElements.companyName);
		return true;
	}

	function validateContactPerson() {
		const value = fields.contactPerson.value.trim();
		const words = value.split(/\s+/).filter(Boolean);
		if (words.length < 2) {
			showFieldError(
				fields.contactPerson,
				errorElements.contactPerson,
				"Ingresa nombre y apellido del contacto"
			);
			return false;
		}
		clearFieldError(fields.contactPerson, errorElements.contactPerson);
		return true;
	}

	function validateCorporateEmail() {
		const value = fields.corporateEmail.value.trim();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) {
			showFieldError(
				fields.corporateEmail,
				errorElements.corporateEmail,
				"Ingresa un email corporativo válido (ejemplo: nombre@empresa.com)"
			);
			return false;
		}
		clearFieldError(fields.corporateEmail, errorElements.corporateEmail);
		return true;
	}

	function validatePhone() {
		const value = fields.phone.value.trim();
		const phoneRegex = /^\+\d[\d\s-]*$/;
		if (!phoneRegex.test(value)) {
			showFieldError(
				fields.phone,
				errorElements.phone,
				"El teléfono debe incluir código de país (ejemplo: +1 213 555 0147)"
			);
			return false;
		}
		clearFieldError(fields.phone, errorElements.phone);
		return true;
	}

	function validateCompanyWebsite() {
		const value = fields.companyWebsite.value.trim();
		if (value === "") {
			clearFieldError(fields.companyWebsite, errorElements.companyWebsite);
			return true;
		}

		const websiteRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
		if (!websiteRegex.test(value)) {
			showFieldError(
				fields.companyWebsite,
				errorElements.companyWebsite,
				"Si incluyes sitio web, debe ser una URL válida"
			);
			return false;
		}
		clearFieldError(fields.companyWebsite, errorElements.companyWebsite);
		return true;
	}

	function validateOperationCountry() {
		if (!fields.operationCountry.value) {
			showFieldError(
				fields.operationCountry,
				errorElements.operationCountry,
				"Selecciona el país de operación principal"
			);
			return false;
		}
		clearFieldError(fields.operationCountry, errorElements.operationCountry);
		return true;
	}

	function validateProductType() {
		if (!fields.productType.value) {
			showFieldError(
				fields.productType,
				errorElements.productType,
				"Selecciona el tipo de producto que manejas"
			);
			return false;
		}
		clearFieldError(fields.productType, errorElements.productType);
		return true;
	}

	function validateMonthlyVolume() {
		if (!fields.monthlyVolume.value) {
			showFieldError(
				fields.monthlyVolume,
				errorElements.monthlyVolume,
				"Selecciona el volumen mensual estimado"
			);
			return false;
		}
		clearFieldError(fields.monthlyVolume, errorElements.monthlyVolume);
		return true;
	}

	function validateServices() {
		const hasSelection = services.some((checkbox) => checkbox.checked);
		if (!hasSelection) {
			showGroupError(errorElements.services, "Selecciona al menos un servicio de interés");
			return false;
		}
		clearGroupError(errorElements.services);
		return true;
	}

	function validateCurrent3pl() {
		const hasSelection = current3plOptions.some((radio) => radio.checked);
		if (!hasSelection) {
			showGroupError(
				errorElements.current3pl,
				"Indica si actualmente trabajas con otro proveedor logístico"
			);
			return false;
		}
		clearGroupError(errorElements.current3pl);
		return true;
	}

	function validateComments() {
		const available = 500 - fields.comments.value.length;
		if (available < 0) {
			showFieldError(
				fields.comments,
				errorElements.comments,
				`Los comentarios no pueden exceder 500 caracteres (quedan ${available})`
			);
			return false;
		}
		clearFieldError(fields.comments, errorElements.comments);
		return true;
	}

	function validatePrivacyPolicy() {
		if (!fields.privacyPolicy.checked) {
			showFieldError(
				fields.privacyPolicy,
				errorElements.privacyPolicy,
				"Debes aceptar la política de privacidad para continuar"
			);
			return false;
		}
		clearFieldError(fields.privacyPolicy, errorElements.privacyPolicy);
		return true;
	}

	function updateVolumeWarning() {
		if (!volumeWarning) {
			return;
		}

		const shouldShowWarning =
			fields.monthlyVolume.value === "0-100" && fields.productType.value !== "";

		if (shouldShowWarning) {
			volumeWarning.textContent =
				"Para volúmenes menores a 100 envíos mensuales, nuestros servicios podrían no ser la solución más eficiente. ¿Seguro que quieres continuar?";
			volumeWarning.classList.remove("hidden");
			return;
		}

		volumeWarning.textContent = "";
		volumeWarning.classList.add("hidden");
	}

	function hideSuccessMessage() {
		if (successMessage) {
			successMessage.classList.add("hidden");
		}
	}

	function showSuccessMessage() {
		if (successMessage) {
			successMessage.classList.remove("hidden");
			successMessage.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}

	function validateForm() {
		const validations = [
			{ isValid: validateCompanyName(), element: fields.companyName },
			{ isValid: validateContactPerson(), element: fields.contactPerson },
			{ isValid: validateCorporateEmail(), element: fields.corporateEmail },
			{ isValid: validatePhone(), element: fields.phone },
			{ isValid: validateCompanyWebsite(), element: fields.companyWebsite },
			{ isValid: validateOperationCountry(), element: fields.operationCountry },
			{ isValid: validateProductType(), element: fields.productType },
			{ isValid: validateMonthlyVolume(), element: fields.monthlyVolume },
			{ isValid: validateServices(), element: services[0] || null },
			{ isValid: validateCurrent3pl(), element: current3plOptions[0] || null },
			{ isValid: validateComments(), element: fields.comments },
			{ isValid: validatePrivacyPolicy(), element: fields.privacyPolicy },
		];

		updateVolumeWarning();

		const firstInvalid = validations.find((item) => !item.isValid);
		return {
			isValid: !firstInvalid,
			firstInvalidElement: firstInvalid ? firstInvalid.element : null,
		};
	}

	function clearAllErrors() {
		clearFieldError(fields.companyName, errorElements.companyName);
		clearFieldError(fields.contactPerson, errorElements.contactPerson);
		clearFieldError(fields.corporateEmail, errorElements.corporateEmail);
		clearFieldError(fields.phone, errorElements.phone);
		clearFieldError(fields.companyWebsite, errorElements.companyWebsite);
		clearFieldError(fields.operationCountry, errorElements.operationCountry);
		clearFieldError(fields.productType, errorElements.productType);
		clearFieldError(fields.monthlyVolume, errorElements.monthlyVolume);
		clearFieldError(fields.comments, errorElements.comments);
		clearFieldError(fields.privacyPolicy, errorElements.privacyPolicy);
		clearGroupError(errorElements.services);
		clearGroupError(errorElements.current3pl);
	}

	fields.companyName.addEventListener("input", validateCompanyName);
	fields.contactPerson.addEventListener("input", validateContactPerson);
	fields.corporateEmail.addEventListener("input", validateCorporateEmail);
	fields.phone.addEventListener("input", validatePhone);
	fields.companyWebsite.addEventListener("input", validateCompanyWebsite);

	fields.operationCountry.addEventListener("change", () => {
		validateOperationCountry();
		updateVolumeWarning();
	});

	fields.productType.addEventListener("change", () => {
		validateProductType();
		updateVolumeWarning();
	});

	fields.monthlyVolume.addEventListener("change", () => {
		validateMonthlyVolume();
		updateVolumeWarning();
	});

	services.forEach((checkbox) => {
		checkbox.addEventListener("change", validateServices);
	});

	current3plOptions.forEach((radio) => {
		radio.addEventListener("change", validateCurrent3pl);
	});

	fields.comments.addEventListener("input", () => {
		updateCommentsCounter();
		validateComments();
	});

	fields.privacyPolicy.addEventListener("change", validatePrivacyPolicy);

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		const result = validateForm();
		if (!result.isValid) {
			hideSuccessMessage();
			if (result.firstInvalidElement) {
				result.firstInvalidElement.focus();
			}
			return;
		}

		clearAllErrors();
		showSuccessMessage();
	});

	form.addEventListener("reset", () => {
		setTimeout(() => {
			clearAllErrors();
			hideSuccessMessage();
			if (volumeWarning) {
				volumeWarning.textContent = "";
				volumeWarning.classList.add("hidden");
			}
			if (commentsCounter) {
				commentsCounter.textContent = "500 caracteres disponibles";
			}
		}, 0);
	});

	updateCommentsCounter();
	updateVolumeWarning();
});
