package com.example.familytree.model;

public class Response<T> {
    private boolean success;
    private T data;
    private String error;

    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public boolean getSuccess() {
        return success;
    }

    public void setData(T data) {
        this.data = data;
    }

    public T getData() {
        return data;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public Response() {};

    public Response(boolean success) {
        this.success = success;
    }
    
    public Response(T data) {
        if(data != null)
        {
            this.success = true;
            this.data = data;
        }
    }
    
    public Response(T data, boolean success) {
        this.success = success;
        this.data = data;
    }
}
