# Guide: Composite Typography Tokens

This document details the workflow for managing text styles using a token system. It explains how primitive values are defined as variables in Figma, combined to create a composite Text Style, and finally translated into a `tokens.json` file.

---

## Step 1: Creating the Primitive Variables in Figma

Before creating a full text style, we define its "ingredients" as primitive variables. This includes font families (`String`), weights, and sizes (`Number`).

**Variables Created:**

- **Name:** `font/family/base`, **Value:** `"Inter"`
- **Name:** `font/weight/regular`, **Value:** `400`
- **Name:** `font/weight/bold`, **Value:** `700`
- **Name:** `font/size/medium`, **Value:** `16`
- **Name:** `font/size/large`, **Value:** `24`
- **Name:** `line-height/default`, **Value:** `1.5`

**This is how it would look in the Figma panel:**

| Name           | Value     | Type    |
| :------------- | :-------- | :------ |
| 🔽 font        |           | (Group) |
| ├── 🔽 family  |           | (Group) |
| │ └── base     | `"Inter"` | String  |
| ├── 🔽 weight  |           | (Group) |
| │ ├── regular  | `400`     | Number  |
| │ └── bold     | `700`     | Number  |
| └── 🔽 size    |           | (Group) |
| ├── medium     | `16`      | Number  |
| └── large      | `24`      | Number  |
| 🔽 line-height |           | (Group) |
| └── default    | `1.5`     | Number  |

---

## Step 2: Creating and Assigning the Text Style in Figma

A **Text Style** in Figma is the equivalent of a composite typography token. Instead of using fixed values, we "compose" it from the primitive variables created in the previous step.

1. **Select a Text Layer:** Choose any text on your canvas.
2. **Assign the Variables:** In the design panel, under the "Text" section, click the "variables" icon for each property (Font Family, Weight, Size, Line Height) and select the corresponding primitive variable.
3. **Save the Style:** Once all properties are linked to variables, click the "Style" icon (four dots) and then the `+` icon to create a new Text Style. Give it a semantic name, like `typography/heading-1`.

**The result in the Figma design panel:**

![Figma Text panel with variables assigned to each property.](https://i.imgur.com/example-figma-text-panel.png)
_(Visual representation of the design panel)_

---

## Step 3: Translating to Token Files

This workflow in Figma translates into a `tokens.json` file that contains both the primitive and composite tokens. The composite token (`typography/heading-1`) references the primitives, creating a connected and easy-to-maintain system.

```json
{
  "font": {
    "family": {
      "base": { "$value": "Inter", "$type": "fontFamily" }
    },
    "weight": {
      "regular": { "$value": 400, "$type": "fontWeight" },
      "bold": { "$value": 700, "$type": "fontWeight" }
    },
    "size": {
      "medium": { "$value": "16px", "$type": "dimension" },
      "large": { "$value": "24px", "$type": "dimension" }
    }
  },
  "line-height": {
    "default": { "$value": 1.5, "$type": "number" }
  },
  "typography": {
    "heading-1": {
      "$value": {
        "fontFamily": "{font.family.base}",
        "fontWeight": "{font.weight.bold}",
        "fontSize": "{font.size.large}",
        "lineHeight": "{line-height.default}"
      },
      "$type": "typography",
      "$description": "Style for the main page headings."
    }
  }
}
```
