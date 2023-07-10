import React from "react"

export const showError = (error, msg) => {
    if (error) {
        return (
            <div className="alert alert-danger">
                {msg}
            </div>
        )
    }
}

export const showSuccess = (success, msg) => {
    if (success) return (
        <div className="alert alert-success">
            {msg}
        </div>
    )
}
export const showLoading = loading => {
    if (loading) return (
        <div className="alert alert-info">
            Loading.....
        </div>
    )
}

export const showEmailSent = (success, msg) => {
    if (success) return (
        <div className="alert alert-success">
            {msg}
        </div>
    )
}

export const showEmailNotSent = (failure, msg) => {
    if (failure) return (
        <div className="alert alert-danger">
            {msg}
        </div>
    )
}

