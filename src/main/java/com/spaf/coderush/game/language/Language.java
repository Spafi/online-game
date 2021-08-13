package com.spaf.coderush.game.language;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Language {

    @Id
    private int id;
    private String name;
    private String codeHighlight;
    private String compilerApiCode;
    private byte versionIndex;
}
