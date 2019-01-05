package com.example.android.samaritanmobile;


import java.io.Serializable;

/**
 * Created by Paulina on 03.01.2019.
 */
public class Action implements Serializable{

    private int id;
    private String name;
    private String date;
    private String description;
    private boolean enteredFromUserPage;

    public Action(String name, String date, String description, boolean enteredFromUserPage){
        this.name = name;
        this.date = date;
        this.description = description;
        this.enteredFromUserPage = enteredFromUserPage;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isEnteredFromUserPage() {
        return enteredFromUserPage;
    }

    public void setEnteredFromUserPage(boolean enteredFromUserPage) {
        this.enteredFromUserPage = enteredFromUserPage;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
