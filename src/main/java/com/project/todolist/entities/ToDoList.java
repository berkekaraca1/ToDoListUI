package com.project.todolist.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TODOLIST")
public class ToDoList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private long id;
    @Column(name = "Task")
    private String task;
    @Column(name = "Priority")
    private String priority;
    @Column(name = "CreatedAt")
    private String createdAt;
    @Column(name = "Status")
    private String status;
}