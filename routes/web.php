<?php

Route::any('/{any}', 'FrontendController@app')->where('any', '^(?!api).*$');