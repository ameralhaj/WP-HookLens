# WP HookLens Report

Project: sample-plugin  
Scanned at: 2026-05-23T20:04:31.642Z  
Root path: ./examples/sample-plugin  
Total files: 1  
Total hooks: 10  

## Summary

| Type | Count |
|---|---:|
| Actions | 3 |
| Filters | 2 |
| do_action | 1 |
| apply_filters | 1 |
| Shortcodes | 1 |
| REST Routes | 2 |

## Hooks

### add_action: init

- Callback: sample_init
- File: sample-plugin.php
- Line: 6
- Column: 1
- Priority: 10
- Accepted args: 1

```php
add_action('init', 'sample_init');
```

### add_filter: the_content

- Callback: sample_filter_content
- File: sample-plugin.php
- Line: 7
- Column: 1
- Priority: 10
- Accepted args: 1

```php
add_filter('the_content', 'sample_filter_content');
```

### shortcode: sample_box

- Callback: sample_shortcode
- File: sample-plugin.php
- Line: 8
- Column: 1

```php
add_shortcode('sample_box', 'sample_shortcode');
```

### do_action: sample_before_init

- Callback: N/A
- File: sample-plugin.php
- Line: 11
- Column: 5

```php
do_action('sample_before_init');
```

### apply_filters: sample_filtered_content

- Callback: N/A
- File: sample-plugin.php
- Line: 15
- Column: 12

```php
apply_filters('sample_filtered_content', $content);
```

### add_action: rest_api_init

- Callback: closure
- File: sample-plugin.php
- Line: 22
- Column: 1
- Priority: 10
- Accepted args: 1

```php
add_action('rest_api_init', function () {
    register_rest_route('sample/v1', '/items', [
        'methods' => 'GET',
        'callback' => 'sample_get_items',
    ]);
});
```

### rest_route: sample/v1/items

- Callback: sample_get_items
- File: sample-plugin.php
- Line: 23
- Column: 5

```php
register_rest_route('sample/v1', '/items', [
        'methods' => 'GET',
        'callback' => 'sample_get_items',
    ]);
```

### add_action: admin_menu

- Callback: $this::register_menu
- File: sample-plugin.php
- Line: 37
- Column: 9
- Priority: 10
- Accepted args: 1
- Method: register_menu

```php
add_action('admin_menu', [$this, 'register_menu'], 10, 1);
```

### add_filter: the_content

- Callback: $this::filter_content
- File: sample-plugin.php
- Line: 38
- Column: 9
- Priority: 20
- Accepted args: 1
- Method: filter_content

```php
add_filter('the_content', [$this, 'filter_content'], 20, 1);
```

### rest_route: sample/v1/admin-items

- Callback: $this::get_items
- File: sample-plugin.php
- Line: 50
- Column: 9
- Method: get_items

```php
register_rest_route('sample/v1', '/admin-items', [
            'methods' => 'GET',
            'callback' => [$this, 'get_items'],
            'permission_callback' => '__return_true',
        ]);
```
