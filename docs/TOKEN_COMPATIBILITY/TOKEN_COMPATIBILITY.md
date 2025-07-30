# Token Compatibility

## Token Compatibility Table: W3C vs. Figma

This table details the W3C design token types that have a direct functional equivalent in Figma. Compatibility has improved significantly, as **Styles** can now be composed from primitive **Variables**.

| Token Type (W3C)       | Figma Equivalent                           | How it's Implemented in Figma                                                                                                                                    |
| :--------------------- | :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Primitive Tokens**   |                                            |                                                                                                                                                                  |
| `Color`                | ✅ **Variable: `Color`**                   | Direct mapping. Used for `fill`, `stroke`, etc.                                                                                                                  |
| `Dimension`            | ✅ **Variable: `Number`**                  | Applied to `width`, `height`, `corner radius`, `spacing`, `stroke width`, `font size`, `letter spacing`, and effect properties.                                  |
| `Font Family`          | ✅ **Variable: `String`**                  | Applied to the `font family` property of a Text Style.                                                                                                           |
| `Font Weight`          | ✅ **Variable: `Number`** or **`String`**  | Applied to the `font weight` property of a Text Style.                                                                                                           |
| `Number`               | ✅ **Variable: `Number`**                  | Used for unitless values like `line-height` or `opacity`.                                                                                                        |
| `Duration`             | ✅ **Variable: `Number`**                  | Can be used in prototyping interactions (e.g., "after delay").                                                                                                   |
| **Composite Tokens**   |                                            |                                                                                                                                                                  |
| `Typography`           | ✅ **Style: `Text Style`**                 | **Fully Composable.** A Text Style can now be built using variables for `fontFamily`, `fontWeight`, `fontSize`, `lineHeight`, and `letterSpacing`.               |
| `Shadow`               | ✅ **Style: `Effect Style`**               | **Fully Composable.** An Effect Style can be built using a `Color` variable and `Number` variables for `offsetX`, `offsetY`, `blur`, and `spread`.               |
| `Border`               | ✅ **Style: `Color Style`** + **Variable** | **Fully Composable.** A Color Style is created for the color and pattern (`solid`/`dashed`), and a `Number` variable is used for the thickness (`stroke width`). |
| `Gradient`             | ✅ **Style: `Color Style`**                | **Composable.** A gradient-type Color Style can use `Color` variables to define its color stops.                                                                 |
| **Unsupported Tokens** |                                            |                                                                                                                                                                  |
| `Cubic Bézier`         | ⚠️ Partially                               | No variable type exists. It can be saved as a `String` for documentation but cannot be applied to animations.                                                    |
| `Transition`           | ❌ No                                      | No direct equivalent exists. Animations are configured in Prototype mode and cannot be saved as tokens.                                                          |

### Updated Key Conclusion

The Figma ecosystem has matured tremendously. The general rule is now stronger than ever:

- **Primitive Values (W3C) ≈ Variables (Figma)**
- **Composite Values (W3C) ≈ Styles (Figma), which are now fully "composable" from Variables.**

This means you can build a design system in Figma that aligns almost perfectly with the W3C specification for all visual style tokens.

---

## Research

- [Comparison of Design Token Philosophies](./COMPARISON_OF_DESIGN_TOKEN_PHILOSOPHIES.md)
- [Typography Tokens](./TYPOGRAPHY_TOKENS.md)
- [Individual Corner Radius Tokens](./INDIVIDUAL_CORNER_RADIUS_TOKENS.md)

## References

- [Design Tokens Format Module](https://www.designtokens.org/tr/drafts/format/)
- [Design Tokens Manager Figma plugin](https://www.figma.com/community/plugin/1263743870981744253/design-tokens-manager)
- [Parametric Components - Raúl Marín video](https://www.youtube.com/watch?v=1kNbLkUIlig)
- [New Figma Variables - Raúl Marín video](https://www.youtube.com/watch?v=DyD8O2rl6lY)
- [Supernova tool- code automation](https://www.supernova.io/code-automation)
