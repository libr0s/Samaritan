package com.example.android.samaritanmobile;

import java.io.Serializable;

/**
 * Created by Paulina on 04.01.2019.
 */
public class Organization implements Serializable{

    private int id;
    private String name;
    private String description;

    public Organization(int id, String name, String  description){
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
