#!/usr/bin/env perl
#
# Simple script to install a gzip'd version of a file. 
#
# Useful for nginx when using the gzip_static option.
#
# Usage:
#    install_gzip.pl source/html/domain/foo.html  /usr/local/nginx/html/domain/foo.html.gz
#

use strict;
my $verbose = 0;
if ($ARGV[0] eq '-v')
{
    $verbose = 1;
    shift @ARGV;
}
my $source_file = shift @ARGV;
my $target_file = shift @ARGV;

die ("source file [$source_file] missing") if (! $source_file);
die ("target file [$target_file] missing") if (! $target_file);
die ("target file [$target_file] does not end in .gz") if ($target_file !~ /\.gz$/);

if (-f $target_file)
{
    # clean up stray .gz files
    `rm -f $target_file`;
}

my $source_file_size = -s $source_file;
print "source = $source_file  size = $source_file_size\n" if ($verbose);
if ($source_file_size > 256)
{
    my $output = `gzip -c -9 $source_file > $target_file`;
    print $output;
    my $target_file_size = -s $target_file;
    print "target = $target_file  size = $target_file_size\n" if ($verbose);
    if ($target_file_size >= $source_file_size)
    {
        # no improvement by gzipping file
        print "removing  $target_file no improvement in size\n" if ($verbose);
        `rm -f $target_file`;        
    }
}
