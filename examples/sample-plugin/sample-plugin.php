<?php
/**
 * Plugin Name: Sample HookLens Plugin
 */

add_action('init', 'sample_init');
add_filter('the_content', 'sample_filter_content');
add_shortcode('sample_box', 'sample_shortcode');

function sample_init() {
    do_action('sample_before_init');
}

function sample_filter_content($content) {
    return apply_filters('sample_filtered_content', $content);
}

function sample_shortcode($atts) {
    return '<div>Sample shortcode</div>';
}

add_action('rest_api_init', function () {
    register_rest_route('sample/v1', '/items', [
        'methods' => 'GET',
        'callback' => 'sample_get_items',
    ]);
});

function sample_get_items() {
    return [
        'items' => [],
    ];
}

class Sample_HookLens_Admin {
    public function __construct() {
        add_action('admin_menu', [$this, 'register_menu'], 10, 1);
        add_filter('the_content', [$this, 'filter_content'], 20, 1);
    }

    public function register_menu() {
        // Register menu page.
    }

    public function filter_content($content) {
        return $content;
    }

    public function register_routes() {
        register_rest_route('sample/v1', '/admin-items', [
            'methods' => 'GET',
            'callback' => [$this, 'get_items'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function get_items() {
        return [
            'items' => [],
        ];
    }
}

new Sample_HookLens_Admin();
