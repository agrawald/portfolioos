package com.portfolio.model;

import java.util.List;

/**
 * Created by e7006722 on 25/02/14.
 */
public class User {
    private String userId;
    private String password;
    private String firstName;
    private String lastName;
    private Address address;
    private Contact contact;
    private String email;
    private String skill;
    private String facebookUrl;
    private String googlePlusUrl;

    public String getFacebookUrl() {
        return facebookUrl;
    }

    public void setFacebookUrl(String facebookUrl) {
        this.facebookUrl = facebookUrl;
    }

    public String getGooglePlusUrl() {
        return googlePlusUrl;
    }

    public void setGooglePlusUrl(String googlePlusUrl) {
        this.googlePlusUrl = googlePlusUrl;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("User{");
        sb.append("userId='").append(userId).append('\'');
        sb.append(", password='").append(password).append('\'');
        sb.append(", firstName='").append(firstName).append('\'');
        sb.append(", lastName='").append(lastName).append('\'');
        sb.append(", address=").append(address);
        sb.append(", contact=").append(contact);
        sb.append(", email='").append(email).append('\'');
        sb.append(", linkedInUrl='").append(linkedInUrl).append('\'');
        sb.append(", facebookUrl='").append(facebookUrl).append('\'');
        sb.append(", googlePlusUrl='").append(googlePlusUrl).append('\'');
        sb.append(", about='").append(about).append('\'');
        sb.append(", skill='").append(skill).append('\'');
        sb.append('}');
        return sb.toString();
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String linkedInUrl;
    private List<String> about;

    public List<String> getAbout() {
        return about;
    }

    public void setAbout(List<String> about) {
        this.about = about;
    }

    public String getLinkedInUrl() {
        return linkedInUrl;
    }

    public void setLinkedInUrl(String linkedInUrl) {
        this.linkedInUrl = linkedInUrl;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }
}
