package com.spaf.jwt.jwt101.problem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type = "pg-uuid")
    private UUID id;
    private String language;
    private String versionIndex;
    @Column(length = 2000)
    private String script;
    private String output;

    @Transient
    private String clientId;

    @Transient
    private String clientSecret;


    @ElementCollection
    private List<String> answers;
}
