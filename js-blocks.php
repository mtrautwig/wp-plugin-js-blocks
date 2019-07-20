<?php
/*
Plugin Name: Dynamic JavaScript Blocks
Author: Marcus Trautwig
*/

wp_register_script( 'moment', plugins_url( 'moment.min.js', __FILE__ ), array( ), '2.4.0', true );
wp_register_script( 'widgets', plugins_url( 'js-blocks.js', __FILE__ ), array( 'moment' ), 1.1, true );

add_action( 'init', function() {
    wp_register_script( 'widgets-editor', plugins_url( 'js-blocks-editor.js' , __FILE__ ), array( 'wp-blocks', 'wp-element' ) );

    register_block_type( 'widgets/clock', array(
        'editor_script' => 'widgets-editor',
    ) );
    register_block_type( 'widgets/calendar', array(
        'editor_script' => 'widgets-editor',
    ) );
});

add_action( 'wp_footer', function() {
    wp_print_scripts( array( 'widgets' ) );
});
