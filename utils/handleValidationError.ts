// utils/handleValidationError.ts
import {Ref} from 'vue';
import {showNotification} from "~/utils/notification";

export function handleValidationError(error: any, errorState: Ref<string | null>) {
    // Check if the error is a 422 Validation error
    if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;

        // Construct a user-friendly error message (optional)
        let errorMessage = '';

        // Join validation errors into a string if there are multiple
        for (const field in validationErrors) {
            errorMessage += `${field}: ${validationErrors[field].join(', ')} `;
        }

        // Set the error message in the error state
        errorState.value = errorMessage;
        showNotification(errorMessage, 'error');
    } else {
        // Handle other types of errors (optional)
        errorState.value = error.response?.data?.message || 'An unknown error occurred.';
        showNotification(errorState.value, 'warning');
    }
}
