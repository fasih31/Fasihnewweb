{ pkgs }: {
  deps = [
    pkgs.nodejs_20
    pkgs.postgresql
    pkgs.python311
    pkgs.python311Packages.pip
    pkgs.openjdk17
    pkgs.gcc
    pkgs.go
    pkgs.rustc
    pkgs.cargo
    pkgs.ruby
    pkgs.php
  ];
}