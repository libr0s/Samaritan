package com.example.android.samaritanmobile;

import java.io.Serializable;

/**
 * Created by Paulina on 04.01.2019.
 */
public class Message implements Serializable {

    private Organization organization;
    private String content;
    private String date;


    public Message(Organization organization, String content, String date){
        this.organization = organization;
        this.content = content;
        this.date = date;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
