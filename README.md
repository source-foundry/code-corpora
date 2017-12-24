# Source Foundry Code Corpora

A repository of source code corpora for text analysis.

## Analysis scripts and pre-baked results

For your convenience, some basic analysis scripts and results are included in this repository, see /scripts. The results in /scripts/results display a single result per line, followed by the absolute number of occurences, and the cumulative percentage of total occurences. Furthermore, the list is divided into chunks of results within the same order of magnitude.

The following reports are available:

**characters.txt**<br>
Counts the number of occurences of each character. ASCII characters represent about 99.9% of this code corpora.

**pairs_alphanumeric.txt**<br>
Counts the number of occurences of two adjacent alphanumeric characters. The following list of 66 pairs cumulatively covers ~50% of the code corpora:

`in re er st on te at th es en se ti le nt or et he de ar co ct tr al ed io me is ta it as ra ri ng nd ec an to ns ro ne li ur ce pe if ic ge ss ch ac il el ll pa si un om ma am ea fi ou ut ve lo la`

**pairs_combinations.txt**<br>
Counts the number of occurences of _any_ two adjacent characters of which one is alphanumeric and the other is not. The following list of 119 pairs cumulatively covers ~50% of the code corpora:

`\x t_ e_ e( e. _s t( _c _t d_ s. t. e, .c e) r_ _p _i 0, _r s_ (s s( _a _f _e r( _d n. t) s) n( n_ _l y( _n $t p_ t, s, _m e; e: 1, T_ (c r. s- d( .g l_ _b k_ _o E_ g_ y_ (i d) o_ m. d. .t _u e' t: .s l( 2, r, r) .h t; #i s[ d, h_ _S t- @p (t .p (r 0; m_ s: (a f. c_ _h 0\ .a ,0 n, s' 3, .e e- n) .r 0) g. (p $p y. _w f( 's t' n' (v f_ $c .0 ,1 p( _E w_ l.`

**pairs.txt**<br>
Counts the number of occurences of _any_ two adjacent characters. The spread in this report is relatively large, so no summary is given.

**punctuation.txt**<br>
Counts the number of occurences of consecutive non-ASCII characters, naively interpreted as punctuation. Solitary occurences of the following twelve characters covers ~60% of this list: `_ , . ( * = ) \ ; { } $`.

**triplets_alphanumeric.txt**<br>
Counts the number of occurences of three adjacent alphanumeric characters.

**triplets_combinations.txt**<br>
Counts the number of occurences of any three adjacent characters, containing both alphanumeric and a non-alphanumeric character.

**triplets.txt**<br>
Counts the number of occurences of any three adjacent characters.

**words.txt**<br>
Counts the number of occurences of (key)words. The following list contains the first chunk of results, or ~23%. In other words, these 54 words make up about 23% of all words used in the code corpora.

`the if return to is of this in for struct int name end and void array new public static self const data value function be class type string get file or with not The size that google path com id else it def char key param common object import list as from code set`

## Licenses

The Corpora license and licenses of all included projects is available in [LICENSE.md](https://github.com/source-foundry/code-corpora/blob/master/LICENSE.md)
