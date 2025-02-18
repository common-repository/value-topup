<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitd6cd3dd993a5f8d0074dce9cff8a09c0
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Stripe\\' => 7,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Stripe\\' => 
        array (
            0 => __DIR__ . '/..' . '/stripe/stripe-php/lib',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitd6cd3dd993a5f8d0074dce9cff8a09c0::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitd6cd3dd993a5f8d0074dce9cff8a09c0::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitd6cd3dd993a5f8d0074dce9cff8a09c0::$classMap;

        }, null, ClassLoader::class);
    }
}
