## Sui & Move Bootcamp

### Display Standard and SDK Integration

#### Sui Display Standard
- Display is Sui's standard for defining how objects should be rendered in wallets and explorers
- It provides a flexible way to attach metadata to on-chain objects
- Metadata is stored on-chain but can reference off-chain resources (like images)

#### Display Template Engine
- Templates use a mustache-like syntax for dynamic field interpolation
- Fields can reference object properties using `{field_name}`
- Supports both static and dynamic values
- Example template:
  ```move
  {
    "name": "{name}",
    "image_url": "{image_url}",
    "description": "{description} - A true Hero of the Sui ecosystem!"
  }
  ```

#### Display Setup in Move
- Display is initialized using the `display::new<T>()` function
- Fields are added using `display::add_field()`
- Common fields include:
  - name
  - description
  - image_url
  - project_url
  - creator
- Example setup:
  ```move
  let display = display::new<Hero>();
  display::add_field(&mut display, "name", "Hero #{id}");
  display::add_field(&mut display, "description", "A powerful hero!");
  display::update_version(&mut display);
  ```

#### Display Fields in SDK
- Objects with Display can be fetched using `getSuiObjectData`
- Display data is included in the object's response under the `display` field
- Fields are parsed automatically by the SDK
- Example structure:
  ```typescript
  {
    data: {
      display: {
        data: {
          name: string,
          description: string,
          image_url: string
        }
      }
    }
  }
  ```

#### Display Management via SDK
- Display can be queried using `getObject` with `ShowDisplay` option
- Display fields can be updated using `TransactionBlock`
- Common operations:
  - Reading display data
  - Updating individual fields
  - Adding new fields
  - Example usage:
    ```typescript
    const objectWithDisplay = await getHeroWithDisplay(objectId);
    const display = objectWithDisplay.data?.display;
    ```

#### Best Practices
- Always version your display changes using `display::update_version()`
- Use consistent field names across your application
- Consider caching display data for better performance
- Validate field values before updating
- Keep image URLs and other external resources reliable and persistent
